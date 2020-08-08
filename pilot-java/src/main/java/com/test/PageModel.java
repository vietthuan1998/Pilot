package com.test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;

/**
 * Page model Utility
 * 
 * @author Chiem Lam Mai
 * @since 20-09-2019
 */
public class PageModel<T> {

	private List<T> responseData;
	private Pageable pageable;
	private int currentPage;
	private int totalPage;
	private List<Integer> pageNumbersList;

	public PageModel(List<T> responseData, Pageable pageable, int totalPage, int currentPage) {
		this.responseData = responseData;
		this.pageable = pageable;
		this.totalPage = totalPage;
		this.pageNumbersList = getPageNumbersList(currentPage, totalPage, Constrains.MAX_PAGE_DISPLAY);
	}

	/**
	 * Get page numbers list
	 * 
	 * @param currentPage
	 * @param totalPage
	 * @param maxPageDisplay
	 * @return List Page Number
	 */
	private static List<Integer> getPageNumbersList(int currentPage, int totalPage, int maxPageDisplay) {

		List<Integer> pageNumberList = new ArrayList<>();

		int pageMin;
		int pageMax;
		pageMin = currentPage - (maxPageDisplay - 1) / 2;
		pageMax = currentPage + (maxPageDisplay - 1) / 2;

		if (pageMin <= 0) {
			pageMin = 1;
			pageMax = maxPageDisplay;
		}

		if (pageMax > totalPage) {
			pageMax = totalPage;
			pageMin = totalPage - maxPageDisplay + 1;
		}

		for (int i = pageMin; i <= pageMax; i++) {
			if (i > 0) {
				pageNumberList.add(i);
			}
		}

		return pageNumberList;
	}

	/**
	 * @return content
	 */
	public List<T> getResponseData() {
		return responseData;
	}

	/**
	 * @param content the content to set
	 */
	public void setResponseData(List<T> responseData) {
		this.responseData = responseData;
	}

	/**
	 * @return pageable
	 */
	public Pageable getPageable() {
		return pageable;
	}

	/**
	 * @param pageable the pageable to set
	 */
	public void setPageable(Pageable pageable) {
		this.pageable = pageable;
	}

	/**
	 * @return currentPage
	 */
	public int getCurrentPage() {
		return currentPage;
	}

	/**
	 * @param currentPage the currentPage to set
	 */
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	/**
	 * @return totalPage
	 */
	public int getTotalPage() {
		return totalPage;
	}

	/**
	 * @param totalPage  the totalPage to set
	 */
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	/**
	 * @return pageNumbersList
	 */
	public List<Integer> getPageNumbersList() {
		return pageNumbersList;
	}
}