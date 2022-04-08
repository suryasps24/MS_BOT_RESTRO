module.exports={
    confirmbooking:(Date,Time,members)=>{
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2",
            "body": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Image",
                                    "size": "Medium",
                                    "url": "https://www.logopik.com/wp-content/uploads/edd/2018/07/Restaurant-Logo-Vector-Design.png"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "Booking Confirmation",
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "color": "Good"
                                }
                            ],
                            "minHeight": "0px",
                            "verticalContentAlignment": "Center"
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "DATE:",
                                    "spacing": "Large",
                                    "size": "Medium",
                                    "color": "Dark",
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": `${Date}`
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "TIME:",
                                    "size": "Medium",
                                    "color": "Dark",
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": `${Time}`
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "MEMBERS:",
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "verticalContentAlignment": "Center"
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": `${members}`
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "text": "Your Booking have been confirmed ,Happy Dining :)",
                    "color": "Good",
                    "weight": "Bolder",
                    "size": "Medium"
                }
            ]
        }
    },

    bill:(food,quantity,price)=>{
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "style": "heading",
                    "separator": true,
                    "size": "ExtraLarge",
                    "text": "Food Bill"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "Item:"
                                }
                            ],
                            "separator": true
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": `${food} with add on coke`
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "separator": true,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "Quantity:"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": `${quantity}`
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "Total Price:"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": `Rs.${price}/-`
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "text": "Hope to see you soon :)",
                    "size": "Large",
                    "color": "Good"
                }
            ]
        }

},

bill2:(food,quantity,price)=>{
    return {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2",
        "body": [
            {
                "type": "TextBlock",
                "wrap": true,
                "style": "heading",
                "separator": true,
                "size": "ExtraLarge",
                "text": "Food Bill"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": "Item:"
                            }
                        ],
                        "separator": true
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": `${food}`
                            }
                        ]
                    }
                ],
                "separator": true
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "separator": true,
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": "Quantity:"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": `${quantity}`
                            }
                        ]
                    }
                ],
                "separator": true
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": "Total Price:"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": `Rs.${price}/-`
                            }
                        ]
                    }
                ],
                "separator": true
            },
            {
                "type": "TextBlock",
                "wrap": true,
                "text": "Hope to see you soon :)",
                "size": "Large",
                "color": "Good"
            }
        ]
    }

}


}
