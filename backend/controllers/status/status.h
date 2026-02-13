#ifndef NORA_C_STATUS_H
#define NORA_C_STATUS_H

#include "../../../lib/Mongoose/mongoose.h"

void get_status(struct mg_connection *c, struct mg_http_message *hm);

#endif //NORA_C_STATUS_H