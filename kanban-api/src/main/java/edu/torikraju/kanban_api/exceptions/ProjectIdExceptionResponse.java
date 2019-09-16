package edu.torikraju.kanban_api.exceptions;

public class ProjectIdExceptionResponse {

    private String identifier;

    public ProjectIdExceptionResponse(String identifier) {
        this.identifier = identifier;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
