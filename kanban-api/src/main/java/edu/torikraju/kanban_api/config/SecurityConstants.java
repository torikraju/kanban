package edu.torikraju.kanban_api.config;

public class SecurityConstants {

    static final String USER_URLS = "/api/user/**";
    static final String H2_URL = "/h2-console/**";
    public static final String SECRET = "Qj4jBjDoCx";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3000000;  // 3000 seconds
    public static final String[] SWAGGER = {
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/v2/api-docs",
            "/webjars/**"
    };
    public static final String[] RESOURCE = {
            "/",
            "/favicon.ico",
            "/**/*.png",
            "/**/*.gif",
            "/**/*.svg",
            "/**/*.jpg",
            "/**/*.html",
            "/**/*.css",
            "/**/*.js"
    };
}
