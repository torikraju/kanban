package edu.torikraju.kanban_api.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class SwaggerBean {

    private ApiInfo apiInfo() {
        Contact contact = new Contact(
                "Torikul Alam",
                "https://github.com/torikraju",
                "torikraju@gmail.com");
        List<VendorExtension> vendorExtensions = new ArrayList<>();

        return new ApiInfo(
                "Kanban-api",
                "RESTful Web Service for personal project management",
                "1.0",
                "", contact,
                "Apache 2.0", "http://www.apache.org/licenses/LICENSE-2.0", vendorExtensions);
    }

    @Bean
    public Docket swaggerConfig() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(PathSelectors.ant("/api/**"))
                .build()
                .apiInfo(apiInfo());
    }
}
