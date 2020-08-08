package com.test;

/**
 * Search model Utility
 * 
 * @author Chiem Lam Mai
 * @since 07-09-2019
 */
public class SearchModel {

	private String productName;
	private String brandName;
	private Double priceFrom;
	private Double priceTo;

	public SearchModel() {
	}

	public SearchModel(String productName, String brandName, Double priceFrom, Double priceTo) {
		this.productName = productName;
		this.brandName = brandName;
		this.priceFrom = priceFrom;
		this.priceTo = priceTo;
	}

	/**
	 * @return the productName
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * @param productName the productName to set
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * @return the brandName
	 */
	public String getBrandName() {
		return brandName;
	}

	/**
	 * @param brandName the brandName to set
	 */
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	/**
	 * @return the priceFrom
	 */
	public Double getPriceFrom() {
		return priceFrom;
	}

	/**
	 * @param priceFrom the priceFrom to set
	 */
	public void setPriceFrom(Double priceFrom) {
		this.priceFrom = priceFrom;
	}

	/**
	 * @return the priceTo
	 */
	public Double getPriceTo() {
		return priceTo;
	}

	/**
	 * @param priceTo the priceTo to set
	 */
	public void setPriceTo(Double priceTo) {
		this.priceTo = priceTo;
	}
}