export default {
    name: 'location',
    type: 'document',
    title: 'Location',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'coordinates',
            title: 'Coordinates',
            type: 'geopoint',
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                            options: {
                                isHighlighted: true,
                            },
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid'
            }
        }
    ]
}