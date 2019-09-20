package edu.torikraju.kanban_api.config;

public class SecurityConstants {

    static final String USER_URLS = "/api/user/**";
    static final String H2_URL = "/h2-console/**";
    public static final String SECRET = "Qj4jBjDoCx";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 30000;  // 30 seconds
}
