package com.kongwei.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.kongwei.bean.SpotData;
import com.kongwei.mapper.SpotDataMapper;
import com.kongwei.service.SpotDataService;

public class SpotDataServiceImpl implements SpotDataService{
	@Autowired
	private SpotDataMapper spotDataMapper;
	public List<SpotData> findDataBycondition(HashMap map) {
		return spotDataMapper.findDataBycondition(map);
	}
	public SpotData findById(HashMap map) {
		return spotDataMapper.findById(map);
	}
	public List<SpotData> findByMap(HashMap map) {
		return spotDataMapper.findByMap(map);
	}

}
