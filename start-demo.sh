#!/bin/bash

echo "Starting Youth Mental Wellness Demo..."
echo ""

echo "Installing dependencies..."
npm run install-all
echo ""

echo "Starting the application..."
echo "Backend will run on http://localhost:5000"
echo "Frontend will run on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

npm start