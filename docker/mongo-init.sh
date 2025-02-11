#!/bin/bash
echo "Waiting for MongoDB to start..."
sleep 5 # Wait for MongoDB to initialize

echo "Initializing MongoDB Replica Set..."
mongosh --eval '
rs.initiate({
  _id: "rs0",
  members: [{ _id: 0, host: "localhost:27017" }]
});
'
echo "Replica Set Initialized!"
