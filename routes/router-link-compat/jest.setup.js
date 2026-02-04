import { TextEncoder, TextDecoder } from 'util';
import { Request } from 'node-fetch'

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
globalThis.Request     = globalThis.Request ?? Request;
