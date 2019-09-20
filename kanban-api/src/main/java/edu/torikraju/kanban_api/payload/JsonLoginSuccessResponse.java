package edu.torikraju.kanban_api.payload;

import java.util.Date;

public class JsonLoginSuccessResponse {
    private boolean success;
    private String token;
    private Date expiresIn;

    public JsonLoginSuccessResponse(boolean success, String token, Date expiresIn) {
        this.success = success;
        this.token = token;
        this.expiresIn = expiresIn;
    }

    public Date getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Date expiresIn) {
        this.expiresIn = expiresIn;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "JsonLoginSuccessResponse{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
