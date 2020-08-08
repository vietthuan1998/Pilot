package com.test;

import org.springframework.http.HttpStatus;

/**
 * Response model Utility
 * 
 * @author Chiem Lam Mai
 * @since 20-09-2019
 */
public class ResponseModel {

	private HttpStatus httpStatus;
	private String message;

	public ResponseModel(HttpStatus httpStatus, String message) {
		this.httpStatus = httpStatus;
		this.message = message;
	}

	/**
	 * @return the httpStatus
	 */
	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	/**
	 * @param httpStatus the httpStatus to set
	 */
	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
}