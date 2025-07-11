# Deployment Guide

This guide provides instructions for deploying the Scatch application to a production environment.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or self-hosted MongoDB (v4.4 or higher)
- PM2 or similar process manager (recommended)
- Nginx or similar web server (recommended)
- Domain name with SSL certificate (recommended)

## Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd scatch
   ```

2. **Install dependencies**

   ```bash
   npm install --production
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_secure_jwt_secret
   EXPRESS_SESSION_SECRET=your_secure_session_secret
   ```

## Database Setup

### MongoDB Atlas

1. Create a new project and cluster in MongoDB Atlas
2. Add your current IP to the IP whitelist
3. Create a database user with read/write permissions
4. Get the connection string and update `MONGODB_URI` in your `.env` file

### Self-hosted MongoDB

1. Install MongoDB on your server
2. Enable authentication
3. Create a database and user
4. Update `MONGODB_URI` in your `.env` file

## Process Management with PM2

1. **Install PM2 globally**

   ```bash
   npm install -g pm2
   ```

2. **Start the application**

   ```bash
   pm2 start app.js --name "scatch"
   ```

3. **Configure PM2 to start on system boot**

   ```bash
   pm2 startup
   pm2 save
   ```

4. **Common PM2 commands**

   ```bash
   # View logs
   pm2 logs scatch

   # Monitor application
   pm2 monit

   # Restart application
   pm2 restart scatch

   # Stop application
   pm2 stop scatch
   ```

## Web Server Configuration (Nginx)

1. **Install Nginx**

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx

   # CentOS/RHEL
   sudo yum install nginx
   ```

2. **Create Nginx configuration**
   Create a new file at `/etc/nginx/sites-available/scatch`:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/scatch /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl restart nginx
   ```

## SSL with Let's Encrypt

1. **Install Certbot**

   ```bash
   # Ubuntu/Debian
   sudo apt install certbot python3-certbot-nginx

   # CentOS/RHEL
   sudo yum install certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate**

   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal**
   Certbot will automatically set up a cron job for renewal. You can test it with:
   ```bash
   sudo certbot renew --dry-run
   ```

## Environment Variables

| Variable               | Description                   | Required | Default       |
| ---------------------- | ----------------------------- | -------- | ------------- |
| NODE_ENV               | Node environment              | Yes      | 'development' |
| PORT                   | Port to run the server        | No       | 3000          |
| MONGODB_URI            | MongoDB connection string     | Yes      | -             |
| JWT_SECRET             | Secret for JWT token signing  | Yes      | -             |
| EXPRESS_SESSION_SECRET | Secret for session encryption | Yes      | -             |

## Monitoring

1. **Enable PM2 monitoring**

   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   pm2 set pm2-logrotate:retain 30
   ```

2. **Set up log rotation**

   ```bash
   # Create log directory
   sudo mkdir -p /var/log/scatch
   sudo chown -R $USER:$USER /var/log/scatch

   # Update PM2 startup script
   pm2 startup
   ```

## Backup Strategy

1. **Database Backups**

   ```bash
   # MongoDB Atlas: Enable Cloud Backup
   # Or for self-hosted MongoDB:
   mongodump --uri="$MONGODB_URI" --out=/path/to/backup/dir

   # Create a daily backup script
   # Add to crontab: 0 0 * * * /path/to/backup/script.sh
   ```

2. **Application Data**
   - Back up the `uploads` directory if using local file storage
   - Consider using a cloud storage service for file uploads in production

## Scaling

1. **Vertical Scaling**

   - Upgrade server resources (CPU, RAM)
   - Enable MongoDB Atlas auto-scaling

2. **Horizontal Scaling**
   - Use a load balancer with multiple app instances
   - Consider using MongoDB sharding for large datasets

## Troubleshooting

1. **Check PM2 logs**

   ```bash
   pm2 logs scatch --lines 100
   ```

2. **Check Nginx logs**

   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

3. **Check MongoDB connection**
   ```bash
   mongosh "$MONGODB_URI" --eval "db.stats()"
   ```
