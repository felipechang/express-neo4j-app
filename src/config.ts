const config = {
    app: {
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 3000,
    },
    db: {
        host: "bolt://localhost:",
        password: "pepes0pe",
        port: 7687,
        user: "neo4j",
    },
};

export default config;
