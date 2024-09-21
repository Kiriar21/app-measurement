while ($true) {
    mongodump --uri="mongodb://127.0.0.1:27017" --db=app_measurement --out C:\CopyMongoDB

    mongorestore --uri="mongodb+srv://app_user:app_password@link_do_clustra/app_measurement?authSource=admin" --nsInclude=app_measurement.* C:\CopyMongoDB

    Start-Sleep -Seconds 30
}
