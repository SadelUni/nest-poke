export const envConfigurations = () => ({
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT) || 3000,
    mongodb: process.env.MONGODB,
    jwtSecret: process.env.JWT_SECRET,
    default_limit: parseInt(process.env.DEFAULT_LIMIT) || 10,
    });