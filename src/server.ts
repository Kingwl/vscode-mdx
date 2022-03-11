import { startServer } from './language-service/server'
import * as typescript from 'typescript'
import * as sourceMap from 'source-map'
import { convert } from './core'

startServer({
    extensionOptionsFactory: (ts: typeof typescript) => {
        return {
            fromExtension: '.mdx',
            targetExtension: ts.Extension.Tsx
        }
    },
    convertion: (fileName: string, text: string) => {
        const result = convert(text, { source: fileName });
        console.log(result);
        return {
            code: result.code,
            map: new sourceMap.SourceMapConsumer(result.map)
        }
    }
})
