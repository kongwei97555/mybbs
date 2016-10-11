package com.kongwei.bean;

public class SpotData {
	private long id;
	private String data;
	private float x;
	private float y;
	private int floor;
	private long up;
	private long down;
	private long left;
	private long right;
	private long fk_market_id;
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
	public int getFloor() {
		return floor;
	}
	public void setFloor(int floor) {
		this.floor = floor;
	}
	public long getUp() {
		return up;
	}
	public void setUp(long up) {
		this.up = up;
	}
	public long getDown() {
		return down;
	}
	public void setDown(long down) {
		this.down = down;
	}
	public long getLeft() {
		return left;
	}
	public void setLeft(long left) {
		this.left = left;
	}
	public long getRight() {
		return right;
	}
	public void setRight(long right) {
		this.right = right;
	}
	public long getFk_market_id() {
		return fk_market_id;
	}
	public void setFk_market_id(long fk_market_id) {
		this.fk_market_id = fk_market_id;
	}
	public String toString() {
		return "SpotDataBean [id=" + id + ", data=" + data + ", x=" + x
				+ ", y=" + y + ", floor=" + floor + ", up=" + up + ", down="
				+ down + ", left=" + left + ", right=" + right
				+ ", fk_market_id=" + fk_market_id + "]";
	}
}
