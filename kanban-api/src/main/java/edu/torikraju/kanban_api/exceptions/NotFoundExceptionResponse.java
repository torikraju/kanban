package edu.torikraju.kanban_api.exceptions;

public class NotFoundExceptionResponse {

    private String notFound;

    public NotFoundExceptionResponse(String notFound) {
        this.notFound = notFound;
    }

    public String getNotFound() {
        return notFound;
    }

    public void setNotFound(String notFound) {
        this.notFound = notFound;
    }
}
