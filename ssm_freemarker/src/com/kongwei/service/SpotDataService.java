package com.kongwei.service;

import java.util.HashMap;
import java.util.List;

import com.kongwei.bean.SpotData;

public interface SpotDataService {
	public List<SpotData> findDataBycondition(HashMap map);
	public SpotData findById(HashMap map);
	public List<SpotData> findByMap(HashMap map);
}
