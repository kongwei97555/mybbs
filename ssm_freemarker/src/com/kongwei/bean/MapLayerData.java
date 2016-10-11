package com.kongwei.bean;

public class MapLayerData {
	@Override
	public String toString() {
		return "MapLayerData [id=" + id + ", data=" + data + ", x=" + x
				+ ", y=" + y + ", type=" + type + "]";
	}
	private long id;
	private String data;
	private float x;
	private float y;
	private int type;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public float getX() {
		return x;
	}
	public void setX(float x) {
		this.x = x;
	}
	public float getY() {
		return y;
	}
	public void setY(float y) {
		this.y = y;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
}
