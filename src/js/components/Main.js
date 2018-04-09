/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Database from "../resources/Database"
import Scenario from "./Scenario"
import HeaderTabs from "./HeaderTabs"
import ScenarioContent from "./ScenarioContent"
import Loader from "./Loader"
import Form from "./Form"
/*** [end of imports] ***/

export default class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			scenarioData: null
		}
	}

	componentDidMount = () => {
		let { pageStyle, scenarioId } = this.props

		if (pageStyle === "home-tab") {
			Database.getScenarios()
				.then(result => {
					// console.info("Database call complete:", result.body.data)
					this.setState({
						scenarioData: result.body.data
					})
				})
				.catch(error => {
					// console.error("Error getting scenarios:", error)
					this.setState({
						scenarioData: null
					})
				})
		} else {
			Database.getScenario({ id: scenarioId })
				.then(result => {
					// console.info("Database call complete:", result.body.data)
					this.setState({
						scenarioData: result.body.data
					})
				})
				.catch(error => {
					// console.error("Error getting scenarios:", error)
					this.setState({
						scenarioData: null
					})
				})
		}
	}

	scenarioContent = () => {
		let { pageStyle } = this.props

		if (this.state.scenarioData) {
			if (pageStyle === "home-tab") {
				return (
					<section className="scenario-feed-wrap">
						{this.state.scenarioData
							.slice(0, 3)
							.map(scenario => (
								<Scenario scenario={scenario} key={scenario.id} />
							))}
					</section>
				)
			} else {
				return <ScenarioContent {...this.state.scenarioData} />
			}
		} else {
			if (pageStyle === "home-tab") {
				return (
					<section className="scenario-feed-wrap">
						<Loader />
					</section>
				)
			} else {
				return <Loader />
			}
		}
	}

	render() {
		let {
			pageStyle,
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			scenarioId
		} = this.props

		if (pageStyle === "modal") {
			return (
				<main className="page app-main modal-page">
					<Form
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						scenarioId={scenarioId}
					/>
				</main>
			)
		} else if (pageStyle === "home-tab") {
			return (
				<main className="page app-main home-tab-page">
					<HeaderTabs />
					{this.scenarioContent()}
				</main>
			)
		} else {
			// Flow
			return (
				<main className="page app-main page-scenario-wrap">
					{this.scenarioContent()}
					<Form
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						scenarioId={scenarioId}
					/>
				</main>
			)
		}
	}
}
