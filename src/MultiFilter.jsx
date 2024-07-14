import { useEffect, useState } from "react"
import { items } from "./Items"

const MultiFilter = () => {
	const [selectedFilters, setSelectedFilters] = useState([])
	const [filteredItems, setFilteredItems] = useState(items)

	let filters = ["Bags", "Watches", "Sports", "Sunglasses"]

	const handleFilterButtonClick = (selectedCategory) => {
		if (selectedFilters.includes(selectedCategory)) {
			let filters = selectedFilters.filter((el) => el !== selectedCategory)
			setSelectedFilters(filters)
		} else {
			setSelectedFilters([...selectedFilters, selectedCategory])
		}
	}

	useEffect(() => {
		filterItems()
	}, [selectedFilters])

	const filterItems = () => {
		if (selectedFilters.length > 0) {
			let tempItems = selectedFilters.map((selectedCategory) => {
				let temp = items.filter((item) => item.category === selectedCategory)
				return temp
			})

			setFilteredItems(tempItems.flat())
		} else {
			setFilteredItems([...items])
		}
	}

	return (
		<div>
			<div className="buttons-container">
				{filters.map((category, idx) => (
					<button
						key={`filters-${idx}`}
						className={`button ${
							selectedFilters?.includes(category) ? "active" : ""
						}`}
						onClick={() => handleFilterButtonClick(category)}
					>
						{category}
					</button>
				))}
			</div>

			<div className="items-container">
				{filteredItems.map((item, idx) => (
					<div key={`items-${idx}`} className="item">
						<p>{item.name}</p>
						<p className="category">{item.category}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default MultiFilter
