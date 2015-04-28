package com.kb.converter.dayoff;

import org.springframework.stereotype.Component;

import com.kb.converter.AbstractConverter;
import com.kb.domain.DayOff;
import com.kb.dto.DayOffDto;

@Component("dayOffConverter")
public class DayOffConverter extends AbstractConverter<DayOff, DayOffDto> {

	@Override
	public DayOffDto convert(final DayOff source, final DayOffDto target) {
		
		target.setId(source.getId());
		target.setAbsenceType(source.getAbsenceType());
		target.setDate(source.getDate());
		target.setDescription(source.getDescription());
		
		target.setCreatedBy(source.getCreatedBy());
		target.setCreatedDate(source.getCreatedDate());
		target.setLastModifiedBy(source.getLastModifiedBy());
		target.setLastModifiedDate(source.getLastModifiedDate());

		if (source.getPublicHoliday() != null) {
			target.setPublicHolidayId(source.getPublicHoliday().getId());
		}
		
		if (source.getSupplierDetails() != null) {
			target.setSupplierDetailsId(source.getSupplierDetails().getId());
		}
		
		return target;
	}

	@Override
	public DayOffDto convert(final DayOff source) {
		return convert(source, new DayOffDto());
	}

}