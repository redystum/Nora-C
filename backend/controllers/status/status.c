#include "status.h"

#include <cjson/cJSON.h>
#include "../../utils/utils.h"

void get_status(struct mg_connection *c, struct mg_http_message *hm) {
    (void) hm;

    cJSON *response_json = cJSON_CreateObject();
    cJSON_AddStringToObject(response_json, "status", "ok");

    char* response = cJSON_Print(response_json);
    cJSON_Delete(response_json);
    mg_http_reply(c, 200, DEFAULT_JSON_HEADER, "%s", response);
}