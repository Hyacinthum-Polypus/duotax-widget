import { useState } from 'react'

export default function ConstructionCalculator() {
    const startYear = 2026;
    const endYear = 1988;
    const totalYears = startYear - endYear + 1;
    const years = Array.from({ length: totalYears }, (_, index) => startYear - index);

    const investmentPropertyTypes = ["house", "granny flat", "townhouse", "apartment", "office", "warehouse"];

    const [selectedYear, setYear] = useState("");

    return (
        <div className="mx-20">
            <div className="mt-4">
                <h1 className="text-2xl font-bold">Construction Cost Calculator</h1>
                <div className="border-b-1">
                    <p>Knowing the costs of building a property in Australia is essential for budget control and monitoring.</p>
                    <p>To estimate how much it will cost to build a house, use our construction cost calculator. Every house is different in size, floor area, and finish.</p>
                </div>
                
                <label htmlFor="cc-constructionYear" className="block mt-4"><span>What year was construction completed?</span></label>
                <select className="form-control mt-4" style={{width: "58.33333333%"}}
                         name="cc-constructionYear" 
                         id="cc-constructionYear" 
                         aria-required="true" 
                         required 
                         value={selectedYear}
                         onChange={e => setYear(e.target.value)}
                >
                    <option value="" disabled hidden>Select...</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    <option value="sep 1987">Sep 1987</option>
                    <option value="before sep 1987">{'<'}Sep 1987</option>
                </select>
            </div>
        </div>
    )
}