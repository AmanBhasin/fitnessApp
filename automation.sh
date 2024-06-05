#!/bin/bash

# Variables
BACKEND_RUN_CMD="node sample_backend.js"
FRONTEND_RUN_CMD="npm run serve"

BACKEND_LOG_FILE="backend.log"
FRONTEND_LOG_FILE="frontend.log"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to print messages
print_message(){
    COLOR=$1
    MESSAGE=$2
    echo -e "${COLOR}${MESSAGE}${NC}"
}

# truncate log files
> $BACKEND_LOG_FILE
> $FRONTEND_LOG_FILE

# Start backend server
print_message $YELLOW "Starting Backend Server"
$BACKEND_RUN_CMD &>> $BACKEND_LOG_FILE &
BACKEND_PID=$!
if [ $? -ne 0 ]; then 
    print_message $RED "Failed to start Backend Server"
    exit 1
fi 

sleep 5

print_message $GREEN "Backend Server Logs"
cat $BACKEND_LOG_FILE

sleep 3

# Start frontend server
print_message $YELLOW "Starting Frontend Server"
$FRONTEND_RUN_CMD &>> $FRONTEND_LOG_FILE & 
FRONTEND_PID=$!
if [ $? -ne 0 ]; then 
    print_message $RED "Failed to start Frontend Server"
    exit 1
fi

sleep 5

print_message $GREEN "Frontend Logs"
cat $FRONTEND_LOG_FILE

sleep 5

print_message $GREEN "Backend and frontend running successfully"

# Wait for backend and frontend to stop
wait $BACKEND_PID
wait $FRONTEND_PID

print_message $GREEN "Backend and frontend stopped"