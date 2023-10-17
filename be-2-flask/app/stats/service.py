class StatsService:
    def __init__(self, stats_repository: StatsRepository):
        self.stats_repository = stats_repository

    def get_stats(self) -> Stats:
        return self.stats_repository.get_stats()
