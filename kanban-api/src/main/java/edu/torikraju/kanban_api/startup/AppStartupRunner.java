package edu.torikraju.kanban_api.startup;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class AppStartupRunner implements ApplicationRunner {
    private static final Logger LOG = LoggerFactory.getLogger(AppStartupRunner.class);



    @Override
    public void run(ApplicationArguments args) throws Exception {
        LOG.info("Application started with option names : {}", args.getOptionNames());
        LOG.info("Increment counter");
    }
}
