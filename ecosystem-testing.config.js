//================================================================================================================
//
//  #####   ###    ###   ####         #####   ####   #####    ####  ##    ##   ####  ######  #####  ###    ###
//  ##  ##  ## #  # ##  #    #        ##     ##     ##   ##  ##      ##  ##   ##       ##    ##     ## #  # ##
//  #####   ##  ##  ##     ##         #####  ##     ##   ##   ###     ####     ###     ##    #####  ##  ##  ##
//  ##      ##      ##   ##           ##     ##     ##   ##     ##     ##        ##    ##    ##     ##      ##
//  ##      ##      ##  ######        #####   ####   #####   ####      ##     ####     ##    #####  ##      ##
//
//================================================================================================================

// NOTE: To run typescript file install this `pm2 install typescript`
module.exports = {
  apps: [
    {
      name: "api.order_prod_test",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      script: "src/index.ts",
      watch: true,
      time: true,
      instance_var: "order_api",
      instances: "1",
      exec_mode: "cluster",
      error_file: "/var/pm2-logs/api-order/err.log",
      out_file: "/var/pm2-logs/api-order/out.log",
      log_file: "/var/pm2-logs/api-order/combined.log",

      // default variables
      env: {
        IS_ON_SERVER: true,
      },

      NODE_ENV: "production",
      JWT_SECRET: "Embargo_mnG_V2.1_Emb@rgoL!m!ted@!AllManagementSaltsPr0d0cti0n",
      ENCRYPTION_SECRET: "Embargo_ScrT_All_Emb@rgoL!m!ted@!AllSyST£mSaltsPr0d0cti0n",
      PORT: "6700",
    },
  ],
}
