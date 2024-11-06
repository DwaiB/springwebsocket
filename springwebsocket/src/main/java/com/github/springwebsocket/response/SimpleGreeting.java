package com.github.springwebsocket.response;


public class SimpleGreeting {
	private String name;

	public SimpleGreeting() {
	}

	public SimpleGreeting(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
