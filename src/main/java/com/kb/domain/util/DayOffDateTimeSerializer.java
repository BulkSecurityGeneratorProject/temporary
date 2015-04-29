package com.kb.domain.util;

import java.io.IOException;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * Custom Jackson serializer for displaying Joda DateTime objects.
 */
public class DayOffDateTimeSerializer extends JsonSerializer<DateTime> {

    private static DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd");

    @Override
    public void serialize(final DateTime value, final JsonGenerator generator,
                          final SerializerProvider serializerProvider)
            throws IOException {
        generator.writeString(formatter.print(value.toDateTime(DateTimeZone.UTC)));
    }

}
