import React from 'react'
import { WidgetsBindingFactory } from '@ui-schema/ui-schema/WidgetsBinding'
import { WidgetProps } from '@ui-schema/ui-schema/Widget'
import { MuiWidgetsBindingCustom, MuiWidgetsBindingTypes, widgets } from '@ui-schema/ds-material/widgetsBinding'
import { NumberRendererCell, StringRendererCell, TextRendererCell } from '@ui-schema/ds-material/Widgets/TextFieldCell'
import { Table } from '@ui-schema/ds-material/Widgets/Table'
import { TableAdvanced } from '@ui-schema/ds-material/Widgets/TableAdvanced'
import { SelectChips } from '@ui-schema/ds-material/Widgets/SelectChips'
import { WidgetCountrySelect } from './Widgets/WidgetCountrySelect'

export type CustomWidgetsBinding = WidgetsBindingFactory<{}, MuiWidgetsBindingTypes<{}>, MuiWidgetsBindingCustom<{}>>

const CustomTable: React.ComponentType<WidgetProps<CustomWidgetsBinding>> = ({widgets, ...props}) => {
    const customWidgets = React.useMemo(() => ({
        ...widgets,
        types: {
            ...widgets.types,
            string: StringRendererCell,
            number: NumberRendererCell,
            integer: NumberRendererCell,
        },
        custom: {
            ...widgets.custom,
            Text: TextRendererCell,
        },
    }), [widgets])

    return <Table
        {...props}
        widgets={customWidgets}
    />
}

export const getCustomWidgets: () => CustomWidgetsBinding = () => ({
    ...widgets,
    types: {
        ...widgets.types,
    },
    custom: {
        ...widgets.custom,
        SelectChips: SelectChips,
        Table: CustomTable,
        TableAdvanced: TableAdvanced,
        CountrySelect: WidgetCountrySelect,
    },
})
