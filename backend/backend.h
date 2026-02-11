#ifndef NORA_C_BACKEND_H
#define NORA_C_BACKEND_H

#include <signal.h>
#include "../shared/shared.h"
#include "../lib/Mongoose/mongoose.h"
#include "../webDriver/src/utils/utils.h"

extern volatile sig_atomic_t keep_running;

void* start_backend(void* arg);

#endif //NORA_C_BACKEND_H