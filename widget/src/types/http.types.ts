export interface HttpResponse<T> {
    data: T,
    isSuccess: boolean,
    statusCode: string,
    message: string,
}