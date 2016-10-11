package com.kongwei.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.kongwei.bean.MapLayerData;
import com.kongwei.mapper.MapLayerDataMapper;
import com.kongwei.service.MapLayerDataService;

public class MapLayerDataServiceImpl implements MapLayerDataService{
	@Autowired
	private MapLayerDataMapper mapLayerDataMapper;
	public List<MapLayerData> findAll() {
		return mapLayerDataMapper.findAll();
	}

}
