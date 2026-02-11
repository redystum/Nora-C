#ifndef NORA_C_FRONTEND_H
#define NORA_C_FRONTEND_H

#include <signal.h>
#include "../shared/shared.h"
#include "../lib/Mongoose/mongoose.h"
#include "../webDriver/src/utils/utils.h"

extern volatile sig_atomic_t keep_running;

void* start_frontend(void* arg);

#endif //NORA_C_FRONTEND_H