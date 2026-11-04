package com.honeymediahouse.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.sql.SQLException;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;

class HealthControllerTest {
    private final JdbcTemplate jdbc = org.mockito.Mockito.mock(JdbcTemplate.class);
    private final HealthController controller = new HealthController(jdbc);

    @Test
    void reportsUpWhenDatabaseResponds() {
        when(jdbc.queryForObject("SELECT 1", Integer.class)).thenReturn(1);

        var response = controller.health();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Map.of("status", "UP", "database", "UP"), response.getBody());
    }

    @Test
    void returnsGenericServiceUnavailableWhenDatabaseIsDown() {
        doThrow(new DataAccessResourceFailureException("connection refused", new SQLException("private driver detail")))
                .when(jdbc).queryForObject("SELECT 1", Integer.class);

        var response = controller.health();

        assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
        assertEquals(Map.of("status", "DOWN", "database", "DOWN"), response.getBody());
        assertFalse(response.getBody().toString().contains("private driver detail"));
    }
}
