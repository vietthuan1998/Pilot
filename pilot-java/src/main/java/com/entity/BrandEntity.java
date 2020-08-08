package com.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "brand")
public class BrandEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "brand_id")
	private int brandId;

	@Column(name = "brand_name")
	private String brandName;

	@Column(name = "logo")
	private String logo;

	@Column(name = "description")
	private String description;
	
	@JsonIgnore
	@OneToMany(mappedBy = "brandEntity", fetch = FetchType.LAZY)
	private Set<ProductEntity> productSet;

	public int getBrandId() {
		return brandId;
	}

	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<ProductEntity> getProductSet() {
		return productSet;
	}

	public void setProductSet(Set<ProductEntity> productSet) {
		this.productSet = productSet;
	}

}
