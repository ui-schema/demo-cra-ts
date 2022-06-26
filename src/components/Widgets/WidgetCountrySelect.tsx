import React from 'react'
import { PROGRESS_DONE, PROGRESS_ERROR, PROGRESS_START, StoreSchemaType, useProgress, WidgetProps, WithScalarValue } from '@ui-schema/ui-schema'
import { CustomWidgetsBinding } from '../UISchema'
import { List } from 'immutable'
import LinearProgress from '@mui/material/LinearProgress'
import { Select } from '@ui-schema/ds-material/Widgets/Select'

export const WidgetCountrySelect: React.ComponentType<WidgetProps<CustomWidgetsBinding> & WithScalarValue> = ({schema, ...props}) => {
    const [countries, setCountries] = React.useState<List<string>>(List())
    const [loading, setLoading] = useProgress()

    React.useEffect(() => {
        setLoading(PROGRESS_START)
        fetch('https://restcountries.com/v3.1/subregion/europe', {method: 'GET'})
            .then(r => r.json())
            .then(data => {
                setCountries(List(data.map((d: { name: { common: string } }) => d.name.common)))
                setLoading(PROGRESS_DONE)
            })
            .catch(() => {
                setLoading(PROGRESS_ERROR)
            })
    }, [setCountries, setLoading])

    if(loading === PROGRESS_START) {
        return <LinearProgress/>
    }

    return <Select
        {...props}
        schema={schema.set('enum', countries) as StoreSchemaType}
    />
}
