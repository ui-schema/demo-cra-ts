import { WidgetProps } from '@ui-schema/react/Widget'
import React from 'react'
import { List } from 'immutable'
import { ps, useProgress } from 'react-progress-state/useProgressNext'
import LinearProgress from '@mui/material/LinearProgress'
import { Select } from '@ui-schema/ds-material/Widgets/Select'

export const WidgetCountrySelect: React.ComponentType<WidgetProps> = ({schema, ...props}) => {
    const [countries, setCountries] = React.useState<List<string>>(List())
    const [loading, setLoading, startLoading] = useProgress()

    React.useEffect(() => {
        const pid = startLoading()
        fetch('https://restcountries.com/v3.1/subregion/europe', {method: 'GET'})
            .then(r => r.json())
            .then(data => {
                const isPid = setLoading(ps.success, undefined, pid)
                if(!isPid) return
                setCountries(List(data.map((d: { name: { common: string } }) => d.name.common)))
            })
            .catch((e) => {
                setLoading(ps.error, e, pid)
            })
    }, [setCountries, setLoading])

    if(loading.progress === ps.none || loading.progress === ps.loading) {
        return <LinearProgress/>
    }

    return <Select
        {...props}
        schema={schema.set('enum', countries)}
    />
}
