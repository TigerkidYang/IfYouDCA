# SOP: Standard Operating Procedure for Creating a New Insight Article

This document outlines the step-by-step process for creating, developing, and publishing a new data-driven insight article with an embedded interactive calculator.

## Phase 1: Ideation and Initial Setup

1.  **Define the Core Idea**: Clearly define the comparison or case study for the new article.

    - _Example_: "What if someone invested in Bitcoin vs. Gold for the last 10 years?"

2.  **Identify Required Data Scenarios**: Determine the exact parameters needed for the interactive calculator. You will need two scenarios: an initial one and a comparison one.

    - _Example - Initial_: Bitcoin (BTC), $100/month, 2014-07 to 2024-06.
    - _Example - Comparison_: Gold (GLD), $100/month, 2014-07 to 2024-06.

3.  **Verify Asset Availability**: Check if the desired assets (e.g., 'BTC', 'GLD') are available in `src/lib/constants.ts`. If not, add them using the `add-asset` script:
    ```bash
    npm run add-asset -- <SYMBOL> "<Asset Name>"
    ```

## Phase 2: Data Pre-calculation

1.  **Add New Scenarios to the Script**: Open `scripts/precalculate-insights.ts`. Add your two new scenarios to the `INSIGHTS_SCENARIOS` array with unique, descriptive IDs.

    - _Example IDs_: `btc-10y-from-2014`, `gld-10y-from-2014`.

    ```javascript
    // scripts/precalculate-insights.ts

    const INSIGHTS_SCENARIOS = [
      // ... existing scenarios
      {
        id: "btc-10y-from-2014",
        input: { asset: "BTC" /* ... */ },
      },
      {
        id: "gld-10y-from-2014",
        input: { asset: "GLD" /* ... */ },
      },
    ];
    ```

2.  **Run the Calculation Script**: Execute the script from your terminal. This will calculate the results and save them to the database cache. **Crucially, it will also print the exact data you need for your article content.**

    ```bash
    npx dotenv -e .env.development.local -- ts-node scripts/precalculate-insights.ts
    ```

3.  **Copy the Output Data**: From the terminal output, copy the key metrics (Final Value, Total Investment, CAGR, etc.) for your new scenarios. You will use these exact numbers in your article.

## Phase 3: Content Creation & Frontend Integration

1.  **Create the New Article**: Open `src/lib/insights-data.ts`. Add a new `InsightPost` object to the `INSIGHTS_POSTS` array.

    - **Write the Content**: Draft the article's title, summary, and main content. Use the data you copied in the previous step to make your points.
    - **Place the Interactive Component**: In the content string, place the `[INTERACTIVE_CALCULATOR_HERE]` placeholder where you want the calculator to appear.
    - **Set the `interactiveScenario`**: This object is now mainly used for the toggle labels. Set it up with the initial asset.

2.  **Map Scenarios in the Frontend**: Open `src/app/insights/[slug]/InsightClientPage.tsx`. Add a new `case` to the `switch` statement that maps your new article's `slug` to the scenario IDs you created.

    ```javascript
    // src/app/insights/[slug]/InsightClientPage.tsx

    switch (post.slug) {
      // ... existing cases
      case "bitcoin-vs-gold-backtest": // Your new slug
        return {
          initialScenarioId: "btc-10y-from-2014",
          comparisonScenarioId: "gld-10y-from-2014",
          toggleLabels: ["Bitcoin (BTC)", "Gold (GLD)"],
        };
    }
    ```

## Phase 4: Final Review and Deployment

1.  **Test Locally**: Start the development server (`npm run dev`) and navigate to your new article's page (e.g., `/insights/bitcoin-vs-gold-backtest`).

    - Verify that the content is correct.
    - Verify that the interactive calculator loads the correct data.
    - Verify that the toggle functionality works as expected.

2.  **Deploy**: Once everything looks good, commit your changes to Git and deploy the project. The new article will be live.
