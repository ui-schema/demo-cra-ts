import { MuiBinding } from '@ui-schema/ds-material'
import { WidgetProps } from '@ui-schema/react/Widget'
import React from 'react'
import { NumberRendererCell, StringRendererCell, TextRendererCell } from '@ui-schema/ds-material/Widgets/TextFieldCell'
import { Table } from '@ui-schema/ds-material/Widgets/Table'
import { TableAdvanced } from '@ui-schema/ds-material/Widgets/TableAdvanced'
import { SelectChips } from '@ui-schema/ds-material/Widgets/SelectChips'
import { WidgetCountrySelect } from './Widgets/WidgetCountrySelect.js'
import { bindingComponents } from '@ui-schema/ds-material/Binding/Components'
import { widgetsDefault } from '@ui-schema/ds-material/Binding/WidgetsDefault'
import { widgetsExtended } from '@ui-schema/ds-material/Binding/WidgetsExtended'
import { DefaultHandler, ValidityReporter } from '@ui-schema/react'
import { schemaPluginsAdapterBuilder } from '@ui-schema/react/SchemaPluginsAdapter'
import { requiredPlugin, validatorPlugin } from '@ui-schema/json-schema'
import { GridItemPlugin } from '@ui-schema/ds-material/GridItemPlugin'

const CustomTable = ({binding, ...props}: WidgetProps) => {
    const customBinding = React.useMemo(() => ({
        ...binding,
        widgets: {
            ...binding?.widgets,
            string: StringRendererCell,
            number: NumberRendererCell,
            integer: NumberRendererCell,
            'integer+number': NumberRendererCell,
            Text: TextRendererCell,
        },
    }), [binding])

    return <Table
        {...props}
        binding={customBinding}
    />
}

export const customBinding: MuiBinding = {
    ...bindingComponents,
    widgetPlugins: [
        DefaultHandler,
        schemaPluginsAdapterBuilder([
            validatorPlugin,
            requiredPlugin,
        ]),
        GridItemPlugin, // use `import { SchemaGridHandler } from '@ui-schema/ds-material/Grid''` for MUI v5/v6
        ValidityReporter,
    ],
    widgets: {
        ...widgetsDefault,
        ...widgetsExtended,
        array: widgetsExtended.GenericList, // `array` is not in default, should be carefully selected, especially if restricted by options (enum/oneOf/anyOf)
        SelectChips: SelectChips,
        Table: CustomTable,
        TableAdvanced: TableAdvanced,
        CountrySelect: WidgetCountrySelect,
    },
}
