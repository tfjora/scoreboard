export const options = (weightData: any, heightData: any, categories: any) => {
    return {
        legend: {
            align: 'right',
            symbolHeight: 8,
            symbolWidth: 5,
            verticalAlign: 'top',
        },
        series: [
            {
                ...weightData,
            },
            {
                ...heightData,
            },
        ],
        title: {
            style: {
                display: 'none',
            },
            text: 'Line chart',
        },

        xAxis: {
            categories: categories,
            // tickColor: '#000',
        },
    };
};
