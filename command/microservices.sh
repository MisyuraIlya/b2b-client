#!/bin/bash

if [ "$1" != "start" ] && [ "$1" != 'stop' ]; then
  echo "You should use parameter \"start\" or \"stop\""
  exit 0
fi

PORT_FORWARDED=$(ps -ef | grep 'port-forward' | grep 'api-platform')

if [ "$1" == "stop" ]; then
  if [ -z "$PORT_FORWARDED" ]; then
    echo "Clear..."
    exit 0
  else
    echo "Killing pods..."
    ps -ef | grep 'port-forward' | grep 'api-platform' | awk '{ print $2; }' | xargs kill
    echo "Success!!!"
    exit 0
  fi
fi

if [ "$1" == "start" ]; then
  if [ -z "$PORT_FORWARDED" ]; then
    echo "Starting port forward..."
  else
    echo "Kill previous pods..."
    ps -ef | grep 'port-forward' | grep 'api-platform' | awk '{ print $2; }' | xargs kill
    echo "Starting port forward..."
  fi

  PODS=$(gcloud container clusters get-credentials digitrade-cluster --region europe-north1 --project seventh-dryad-358207 \
  && kubectl get pods | grep api-platform)

  for i in $PODS
  do
    if [[ "$i" == *"api-platform"* ]]; then
      case "$i" in
      *"client-manager"*)
        kubectl port-forward "$i" 8010:80 --address='0.0.0.0' &
        echo "$i"
        ;;
      *"color-app"*)
        kubectl port-forward "$i" 8011:80 --address='0.0.0.0' &
        echo "$i"
        ;;
      *"translate-app"*)
        kubectl port-forward "$i" 8012:80 --address='0.0.0.0' &
        echo "$i"
        ;;
      *"b2b-client-backend"*)
        kubectl port-forward "$i" 8013:80 --address='0.0.0.0' &
        echo "$i"
        ;;
      esac
    fi
  done

fi

#KILL_PODS=$(ps -ef | grep 'port-forward' | grep -v grep | awk '{ print $2; }' | xargs kill)