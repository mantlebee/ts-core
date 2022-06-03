/**
 * This interface is used to abstract on the connection to the server.
 * It is designed to make the application independent from the way to
 * call the server. <br>
 * For example: In an angular application this is implemented with
 * $http, in a jquery application with $.ajax and etc...<br>
 * IMPORTANT: Core does not give an implementation for this interface,
 *            this is responability of the application implementation!
 */
export interface IRemoteServerConnector {
  /**
   * Perform a call with post protocol.
   * @param method - Name of the method to call,
   * @param args   - Dictionary object that contains the arguments
   *                 to pass to the call:
   *                 <ul>
   *                   <li>
   *                     Key: Key is the name of the parameter.
   *                   </li>
   *                   <li>
   *                     Value: Serialize value of the parameter.
   *                   </li>
   *                 </ul>
   * @returns A promise that contains the result of the call.
   * @TODO Write contract.
   */
  post(method: string, args?: { [id: string]: any }): Promise<any>;

  /**
   * Perform a call with get protocol.
   * @param method - Name of the method to call,
   * @param args   - Dictionary object that contains the arguments
   *                 to pass to the call:
   *                 <ul>
   *                   <li>
   *                     Key: Key is the name of the parameter.
   *                   </li>
   *                   <li>
   *                     Value: Value of the parameter.
   *                   </li>
   *                 </ul>
   * @returns A promise that contains the result of the call.
   */
  get(method: string, args?: { [id: string]: any }): Promise<any>;

  /**
   * Set the headers for the next http call. Header are stored until
   * an other call to setHeader.
   * @param headers - Dictionary that represent the headers to set:
   *                  <ul>
   *                    <li>Key:   Name of the header to set.</li>
   *                    <li>Value: Value of the header to set.</li>
   *                  </ul>
   */
  setHeaders(headers: { [id: string]: string }): void;

  /**
   * Gets the headers set by the setHeadersMethod.
   * @return Dictionary that represent the headers to set:
   *         <ul>
   *           <li> Key:   Name of the header to set. </li>
   *           <li> Value: Value of the header to set. </li>
   *         </ul>
   */
  getHeaders(): { [id: string]: string };
}
