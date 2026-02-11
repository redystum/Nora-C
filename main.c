#include <stdio.h>
#include <pthread.h>
#include <signal.h>
#include <errno.h>

#include "args.h"
#include "backend/backend.h"
#include "frontend/frontend.h"
#include "webDriver/src/utils/utils.h"
#include "shared/shared.h"

volatile sig_atomic_t keep_running = 1;

void handle_sigint(int sig) {
    (void)sig;
    keep_running = 0;
    printf("\nbye!\n");
}

int main(int argc, char *argv[]) {
    struct sigaction sa;
    sa.sa_handler = handle_sigint;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    if (sigaction(SIGINT, &sa, NULL) == -1) {
        ERROR(1, "Error setting up signal handler");
        return 1;
    }
    if (sigaction(SIGTERM, &sa, NULL) == -1) {
        ERROR(1, "Error setting up signal handler");
        return 1;
    }

    struct gengetopt_args_info args;

    if (cmdline_parser(argc, argv, &args) != 0) {
        ERROR(1, "Error parsing command line");
        return 1;
    }

    char *fhost = args.fhost_arg;
    int fport = args.fport_arg;
    char *bhost = args.bhost_arg;
    int bport = args.bport_arg;
    int sport = args.sport_arg;


    pthread_t frontend_tid;
    pthread_t backend_tid;

    threads_args_t threads_args = {
            .web_host = fhost,
            .web_port = fport,
            .server_host = bhost,
            .server_port = bport,
            .ws_port = sport
    };


    if ((errno = pthread_create(&frontend_tid, NULL, start_frontend, &threads_args)) != 0) {
        ERROR(1, "Error creating frontend thread");
        return 1;
    }

    if ((errno = pthread_create(&backend_tid, NULL, start_backend, &threads_args)) != 0) {
        ERROR(1, "Error creating backend thread");
        return 1;
    }

    if ((errno = pthread_join(frontend_tid, NULL)) != 0) {
        ERROR(1, "Error joining frontend thread");
        return 1;
    }

    if ((errno = pthread_join(backend_tid, NULL)) != 0) {
        ERROR(1, "Error joining backend thread");
        return 1;
    }

    cmdline_parser_free(&args);
    return 0;
}