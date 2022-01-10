module.exports = {
  apps : [{
    name: 'storage-manager',
    script: 'app.js',
    cwd: "./",
    instances: 1 ,
    autorestart: true,
    watch: false,
    max_memory_restart: '1000M',
    log_date_format:"YYYY-MM-DD HH:mm:ss",
	env_test: {
	  NODE_ENV: 'test'
	},
    env_development: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
