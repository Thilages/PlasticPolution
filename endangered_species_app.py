# Import necessary libraries
import pandas as pd
import calendar
import ast  # For safely evaluating strings that look like lists
import plotly.express as px
from dash import Dash, dcc, html, Input, Output
import dash_daq as daq

# Load the dataset (make sure the CSV is in the same directory)
df = pd.read_csv("synthetic_rare_fish_data.csv")

# Add 'Breeding Months' column if not already present (Assuming 'Breeding Time' is present)
def month_to_numeric(breeding_period):
    months = []
    if "Jan" in breeding_period:
        months.append(1)
    if "Feb" in breeding_period:
        months.append(2)
    if "Mar" in breeding_period:
        months.append(3)
    if "Apr" in breeding_period:
        months.append(4)
    if "May" in breeding_period:
        months.append(5)
    if "Jun" in breeding_period:
        months.append(6)
    if "Jul" in breeding_period:
        months.append(7)
    if "Aug" in breeding_period:
        months.append(8)
    if "Sep" in breeding_period:
        months.append(9)
    if "Oct" in breeding_period:
        months.append(10)
    if "Nov" in breeding_period:
        months.append(11)
    if "Dec" in breeding_period:
        months.append(12)
    return months

# Apply the function to create 'Breeding Months'
df['Breeding Months'] = df['Breeding Time'].apply(month_to_numeric)

# Initialize the Dash app
app = Dash(__name__)

# Layout of the app
app.layout = html.Div([
    html.H1("Endangered Fish Species Monitoring Calendar"),

    # Date Picker for calendar range
    html.Label("Select a Date Range:"),
    dcc.DatePickerRange(
        id='date-picker-range',
        start_date="2024-01-01",
        end_date="2024-12-31",
        display_format="DD/MM/YYYY"
    ),

    # Dropdown for location selection
    html.Label("Select Location:"),
    dcc.Dropdown(
        id='location-dropdown',
        options=[{'label': loc, 'value': loc} for loc in df['Location'].unique()],
        value='Goa'  # default location
    ),

    # Bar Chart for species count
    dcc.Graph(id='species-bar-chart'),

    # Individual species breeding time plots
    html.Div(id='individual-breeding-graphs')
])

# Callback to update the bar chart based on location and date range
@app.callback(
    Output('species-bar-chart', 'figure'),
    [Input('date-picker-range', 'start_date'),
     Input('date-picker-range', 'end_date'),
     Input('location-dropdown', 'value')]
)
def update_bar_chart(start_date, end_date, location):
    # Filter the data based on location and date range
    filtered_df = df[(df['Location'] == location)]

    # Generate a bar chart for species counts in the selected location
    species_count = filtered_df['Species'].value_counts()
    fig = px.bar(
        x=species_count.index,
        y=species_count.values,
        labels={'x': 'Species', 'y': 'Count'},
        title=f"Count of Endangered & Critical Species in {location}"
    )
    return fig

# Callback to generate breeding time plots for each species
@app.callback(
    Output('individual-breeding-graphs', 'children'),
    [Input('location-dropdown', 'value')]
)
def update_individual_species_charts(location):
    filtered_df = df[df['Location'] == location]
    figures = []

    # Process each species individually
    for species in filtered_df['Species'].unique():
        species_data = filtered_df[filtered_df['Species'] == species]
        breeding_months = []

        # Convert 'Breeding Months' from strings to lists if needed
        for months in species_data['Breeding Months']:
            if isinstance(months, str):
                months = ast.literal_eval(months)
            breeding_months += [calendar.month_abbr[month] for month in months]

        # Create a histogram for the breeding months of each species
        fig = px.histogram(
            x=breeding_months,
            labels={'x': 'Breeding Month'},
            title=f"Breeding Months for {species}"
        )
        fig.update_layout(bargap=0.2)

        figures.append(html.Div([
            html.H3(f"{species}"),
            dcc.Graph(figure=fig)
        ]))

    return figures

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
