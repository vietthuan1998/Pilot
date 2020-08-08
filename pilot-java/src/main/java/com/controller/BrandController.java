package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.BrandEntity;
import com.service.BrandService;
import com.test.Constrains;
import com.test.PageModel;

@CrossOrigin
@RestController
@RequestMapping("/brand")
public class BrandController {
	/*
	 * (origins = "http://localhost:4200", maxAge = 3600)s
	 * POST – Create: Tạo dữ liệu mới
	 * GET – Read: Lấy dữ liệu về
	 * PUT – Update: Cập nhật dữ liệu
	 * DELETE – Delete: Xóa dữ liệu
	 */

	@Autowired
	BrandService brandService;

	@GetMapping(value = "/getall")
	public List<BrandEntity> getAllBrands() {
//		System.out.println("test1");
		return brandService.getBrands();
	}

	@GetMapping(value = "/find-brand-by-name/{brandName}")
	public BrandEntity findBrandByBrandName(@PathVariable("brandName") String brandName) {
		return brandService.findBrandByName(brandName);
	}

	@GetMapping(value = "/find-brand-by-id/{id}")
	public BrandEntity findBrandByBrandId(@PathVariable("id") int id) {
		return brandService.findBrandById(id);
	}

	@GetMapping(value = "/get-all-brand-name")
	public List<String> getAllBrandName() {
		return brandService.getAllBrandName();
	}

	@PostMapping(value = "/insert-brand")
	public void insertBrand(@RequestBody BrandEntity brandEntity) {
		System.out.println("CHECK INSERT");
		brandService.insertOrUpdate(brandEntity);
	}

	@PutMapping(value = "/update-brand")
	public void updateBrand(@RequestBody BrandEntity brandEntity) {
		System.out.println("CHECK UPDATE");
		brandService.insertOrUpdate(brandEntity);
	}

	@DeleteMapping(value = "/delete-brand/{id}")
	public void deleteBrand(@PathVariable("id") int id) {
		System.out.println("Test DELETE");
		brandService.delete(id);
		
	}
	
//	@PostMapping(value = "/delete-brand")
//	public void deleteBrand(@RequestBody BrandEntity brandEntity) {
//		brandService.delete(brandEntity);
//	}
	
	@GetMapping(value = "/get-brands", params = { "page", "name" })
	public PageModel<BrandEntity> getBrandsByPageable(@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "name") String name) {
		System.out.println("test1");
		return brandService.getBrandsByPageable(name, PageRequest.of(page, Constrains.PAGE_SIZE), page);
	}
	
}
